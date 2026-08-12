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

type JoinFormValuesDTO = {
  bandArtistName: string;
  personalName: string;
  email: string;
  location: string;
  mediaLink: string;
  artistBio: string;
  message: string;
};

type JoinSubmitPayloadDTO = JoinFormValuesDTO & {
  _subject: string;
  _template: string;
  _replyto: string;
};

const JOIN_FORM_ENDPOINT =
  process.env.REACT_APP_JOIN_FORM_ENDPOINT ??
  "https://formsubmit.co/ajax/contact@reddragonrecords.tw";

const emptyValues: JoinFormValuesDTO = {
  bandArtistName: "",
  personalName: "",
  email: "",
  location: "",
  mediaLink: "",
  artistBio: "",
  message: "",
};

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

  const updateField =
    (field: keyof JoinFormValuesDTO) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) {
      setStatus("success");
      setValues(emptyValues);
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    const payload: JoinSubmitPayloadDTO = {
      ...values,
      _subject: `Affiliate application: ${values.bandArtistName}`,
      _template: "table",
      _replyto: values.email,
    };
    try {
      const response = await fetch(JOIN_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      setValues(emptyValues);
    } catch {
      setStatus("error");
      setErrorMessage(copy.error);
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
        <JoinForm onSubmit={handleSubmit} noValidate={false}>
          <Honeypot
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
          <Field>
            <FieldLabel theme={theme}>{copy.fields.bandArtistName}</FieldLabel>
            <TextInput
              theme={theme}
              name="bandArtistName"
              type="text"
              required
              value={values.bandArtistName}
              onChange={updateField("bandArtistName")}
            />
          </Field>
          <Field>
            <FieldLabel theme={theme}>{copy.fields.personalName}</FieldLabel>
            <TextInput
              theme={theme}
              name="personalName"
              type="text"
              required
              value={values.personalName}
              onChange={updateField("personalName")}
            />
          </Field>
          <Field>
            <FieldLabel theme={theme}>{copy.fields.email}</FieldLabel>
            <TextInput
              theme={theme}
              name="email"
              type="email"
              required
              value={values.email}
              onChange={updateField("email")}
            />
          </Field>
          <Field>
            <FieldLabel theme={theme}>{copy.fields.location}</FieldLabel>
            <TextInput
              theme={theme}
              name="location"
              type="text"
              required
              value={values.location}
              onChange={updateField("location")}
            />
          </Field>
          <Field>
            <FieldLabel theme={theme}>{copy.fields.mediaLink}</FieldLabel>
            <TextInput
              theme={theme}
              name="mediaLink"
              type="url"
              required
              placeholder={copy.placeholders.mediaLink}
              value={values.mediaLink}
              onChange={updateField("mediaLink")}
            />
          </Field>
          <Field>
            <FieldLabel theme={theme}>{copy.fields.artistBio}</FieldLabel>
            <TextArea
              theme={theme}
              name="artistBio"
              required
              placeholder={copy.placeholders.artistBio}
              value={values.artistBio}
              onChange={updateField("artistBio")}
            />
          </Field>
          <Field>
            <FieldLabel theme={theme}>{copy.fields.message}</FieldLabel>
            <TextArea
              theme={theme}
              name="message"
              required
              placeholder={copy.placeholders.message}
              value={values.message}
              onChange={updateField("message")}
            />
          </Field>
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
