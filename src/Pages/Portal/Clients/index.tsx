import React from "react";
import styled from "styled-components";
import Page from "../../../Components/Page";
import { designTokens } from "../../../DesignSystem";
import { useTheme } from "../../../Utils/Theme";
import { Client, clients } from "../../../Api/portal";
import { FormStatus, TextInput } from "../../Join/styles";
import { LinkButton, Shell } from "../../Login/styles";
import { IndexList, PortalTitle, Sweep, useSweep } from "../IndexList";

const NewClient = styled.form`
  display: flex;
  gap: ${designTokens.spacing.lg};
  align-items: center;
  margin-bottom: ${designTokens.spacing.xl};

  input {
    flex: 1;
    min-width: 0;
  }
`;

const Clients: React.FC = () => {
  const { theme } = useTheme();
  const { go, sweepProps } = useSweep();
  const [list, setList] = React.useState<Client[] | null>(null);
  const [name, setName] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    clients.list().then(setList, (e: Error) => setError(e.message));
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const created = await clients.create(name.trim());
      go(`/portal/clients/${created.id}`);
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Page>
      <Shell theme={theme} $wide style={{ overflowX: "clip" }}>
        <Sweep {...sweepProps}>
          <PortalTitle>Clients</PortalTitle>
          <NewClient onSubmit={create}>
            <TextInput
              theme={theme}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New client name (artist, band or company)"
              aria-label="New client name"
              required
            />
            <LinkButton theme={theme} type="submit" disabled={busy || !name.trim()}>
              Add client
            </LinkButton>
          </NewClient>
          {error ? (
            <FormStatus theme={theme} $tone="error">
              {error}
            </FormStatus>
          ) : null}
          <IndexList
            items={
              list &&
              [...list]
                .sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }))
                .map((c) => ({
                  id: c.id,
                  title: c.displayName,
                  meta: c.contactEmail ?? undefined,
                  aside: `since ${new Date(c.createdAt).toLocaleDateString()}`,
                }))
            }
            empty="No clients yet. Add one above."
            onOpen={(item) => go(`/portal/clients/${item.id}`)}
          />
        </Sweep>
      </Shell>
    </Page>
  );
};

export default Clients;
