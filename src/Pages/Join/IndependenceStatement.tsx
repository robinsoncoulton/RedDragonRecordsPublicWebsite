import React from "react";
import { Theme } from "../../Utils/Theme/types";
import { LocalisationCopy } from "../../Localisation/types";
import {
  IndependenceBody,
  IndependencePrimary,
  IndependenceSecondary,
  IndependenceSection,
} from "./styles";

type IndependenceStatementProps = {
  theme: Theme;
  copy: LocalisationCopy["join"]["independence"];
};

const IndependenceStatement: React.FC<IndependenceStatementProps> = ({
  theme,
  copy,
}) => (
  <IndependenceSection>
    <IndependencePrimary theme={theme}>{copy.primary}</IndependencePrimary>
    <IndependenceSecondary theme={theme}>{copy.secondary}</IndependenceSecondary>
    <IndependenceBody theme={theme}>{copy.body}</IndependenceBody>
  </IndependenceSection>
);

export default IndependenceStatement;
