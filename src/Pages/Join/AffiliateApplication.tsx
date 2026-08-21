import React from "react";
import { Theme } from "../../Utils/Theme/types";
import { LocalisationCopy } from "../../Localisation/types";
import {
  ApplicationClosing,
  ApplicationCopy,
  ApplicationHeading,
  ApplicationIntro,
  ApplicationLayout,
  ApplicationPoint,
  ApplicationPoints,
  ApplicationSection,
  Field,
  FieldLabel,
  FileHint,
  FileInput,
  FormStatus,
  Honeypot,
  JoinForm,
  SubmitButton,
  SubmitButtonArrow,
  SubmitButtonFill,
  SubmitButtonText,
  TextArea,
  TextInput,
} from "./styles";
import { trackEvent } from "../../Analytics";

type JoinFormValuesDTO = {
  bandArtistName: string;
  personalName: string;
  email: string;
  genre: string;
  location: string;
  mediaLink: string;
  artistBio: string;
  message: string;
};

type JoinTextField = {
  name: keyof JoinFormValuesDTO;
  type?: "text" | "email" | "url";
  as?: "input" | "textarea";
  placeholder?: keyof LocalisationCopy["join"]["application"]["placeholders"];
};

type JoinFileField = {
  name: "representativeImage" | "additionalImages";
  required?: boolean;
  multiple?: boolean;
};

const JOIN_FORM_ENDPOINT =
  process.env.REACT_APP_JOIN_FORM_ENDPOINT ??
  "https://formsubmit.co/ajax/contact@reddragonrecords.tw";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

const emptyValues: JoinFormValuesDTO = {
  bandArtistName: "",
  personalName: "",
  email: "",
  genre: "",
  location: "",
  mediaLink: "",
  artistBio: "",
  message: "",
};

const textFields: JoinTextField[] = [
  { name: "bandArtistName" },
  { name: "personalName" },
  { name: "email", type: "email" },
  { name: "genre" },
  { name: "location" },
  { name: "mediaLink", type: "url", placeholder: "mediaLink" },
  { name: "artistBio", as: "textarea", placeholder: "artistBio" },
  { name: "message", as: "textarea", placeholder: "message" },
];

const fileFields: JoinFileField[] = [
  { name: "representativeImage", required: true },
  { name: "additionalImages", multiple: true },
];

const filesFromForm = (formData: FormData) =>
  ["representativeImage", "additionalImages"].flatMap((name) =>
    formData
      .getAll(name)
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)
  );

type AffiliateApplicationProps = {
  theme: Theme;
  copy: LocalisationCopy["join"]["application"];
};

const AffiliateApplication: React.FC<AffiliateApplicationProps> = ({ theme, copy }) => {
  const [values, setValues] = React.useState<JoinFormValuesDTO>(emptyValues);
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = React.useState("");
  const hasStarted = React.useRef(false);

  const markFormStart = () => {
    if (hasStarted.current) {
      return;
    }
    hasStarted.current = true;
    trackEvent("join_form_start");
  };

  const updateField =
    (field: keyof JoinFormValuesDTO) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      markFormStart();
      setValues((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (honeypot) {
      setStatus("success");
      setValues(emptyValues);
      form.reset();
      return;
    }
    const formData = new FormData(form);
    const totalBytes = filesFromForm(formData).reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_UPLOAD_BYTES) {
      setStatus("error");
      setErrorMessage(copy.fileTooLarge);
      trackEvent("join_form_error", { reason: "too_large" });
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    trackEvent("join_form_submit");
    formData.append("_subject", `Affiliate application: ${values.bandArtistName}`);
    formData.append("_template", "table");
    formData.append("_replyto", values.email);
    try {
      const response = await fetch(JOIN_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      setValues(emptyValues);
      form.reset();
      trackEvent("join_form_success");
    } catch {
      setStatus("error");
      setErrorMessage(copy.error);
      trackEvent("join_form_error", { reason: "request_failed" });
    }
  };

  return (
    <ApplicationSection id="join-application">
      <ApplicationLayout>
        <ApplicationIntro>
          <ApplicationHeading theme={theme}>{copy.heading}</ApplicationHeading>
          <ApplicationCopy theme={theme}>{copy.intro}</ApplicationCopy>
          <ApplicationPoints>
            {copy.points.map((point) => (
              <ApplicationPoint key={point} theme={theme}>
                {point}
              </ApplicationPoint>
            ))}
          </ApplicationPoints>
          <ApplicationClosing theme={theme}>{copy.closing}</ApplicationClosing>
        </ApplicationIntro>
        <JoinForm onSubmit={handleSubmit} encType="multipart/form-data">
          <Honeypot
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
          {textFields.map((field) => (
            <Field key={field.name}>
              <FieldLabel theme={theme}>{copy.fields[field.name]}</FieldLabel>
              {field.as === "textarea" ? (
                <TextArea
                  theme={theme}
                  name={field.name}
                  required
                  placeholder={
                    field.placeholder ? copy.placeholders[field.placeholder] : undefined
                  }
                  value={values[field.name]}
                  onChange={updateField(field.name)}
                />
              ) : (
                <TextInput
                  theme={theme}
                  name={field.name}
                  type={field.type ?? "text"}
                  required
                  placeholder={
                    field.placeholder ? copy.placeholders[field.placeholder] : undefined
                  }
                  value={values[field.name]}
                  onChange={updateField(field.name)}
                />
              )}
            </Field>
          ))}
          {fileFields.map((field) => (
            <Field key={field.name}>
              <FieldLabel theme={theme}>{copy.fields[field.name]}</FieldLabel>
              <FileHint theme={theme}>{copy.placeholders[field.name]}</FileHint>
              <FileInput
                theme={theme}
                name={field.name}
                type="file"
                accept={IMAGE_ACCEPT}
                required={field.required}
                multiple={field.multiple}
                onChange={markFormStart}
              />
            </Field>
          ))}
          <SubmitButton theme={theme} type="submit" disabled={status === "submitting"}>
            <SubmitButtonText>
              {status === "submitting" ? copy.submitting : copy.submit}
            </SubmitButtonText>
            <SubmitButtonFill theme={theme} />
            <SubmitButtonArrow theme={theme}>→</SubmitButtonArrow>
          </SubmitButton>
          {status === "success" ? (
            <FormStatus theme={theme} $tone="success">
              {copy.success}
            </FormStatus>
          ) : null}
          {status === "error" ? (
            <FormStatus theme={theme} $tone="error">
              {errorMessage}
            </FormStatus>
          ) : null}
        </JoinForm>
      </ApplicationLayout>
    </ApplicationSection>
  );
};

export default AffiliateApplication;
