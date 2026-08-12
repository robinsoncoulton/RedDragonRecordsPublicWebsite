import React from "react";
import { Theme } from "../../Utils/Theme/types";
import {
  ArtistCopy,
  ArtistCopyBlocks,
  ArtistCopyHeading,
  ArtistCopyList,
  ArtistCopyListItem,
  ArtistQuote,
  ArtistQuoteAttribution,
} from "./styles";
import { ArtistCopyBlockDTO, ArtistCopyBlockType } from "./types";

type ArtistCopyContentProps = {
  blocks: ArtistCopyBlockDTO[];
  theme: Theme;
};

const ArtistCopyContent: React.FC<ArtistCopyContentProps> = ({ blocks, theme }) => (
  <ArtistCopyBlocks>
    {blocks.map((block, index) => {
      switch (block.type) {
        case ArtistCopyBlockType.PARAGRAPH:
          return (
            <ArtistCopy key={`copy-${index}`} theme={theme}>
              {block.text}
            </ArtistCopy>
          );
        case ArtistCopyBlockType.QUOTE:
          return (
            <ArtistQuote key={`copy-${index}`} theme={theme}>
              {block.text}
              <ArtistQuoteAttribution theme={theme}>{block.attribution}</ArtistQuoteAttribution>
            </ArtistQuote>
          );
        case ArtistCopyBlockType.HEADING:
          return (
            <ArtistCopyHeading key={`copy-${index}`} theme={theme}>
              {block.text}
            </ArtistCopyHeading>
          );
        case ArtistCopyBlockType.LIST:
          return (
            <ArtistCopyList key={`copy-${index}`}>
              {block.items.map((item) => (
                <ArtistCopyListItem key={item} theme={theme}>
                  {item}
                </ArtistCopyListItem>
              ))}
            </ArtistCopyList>
          );
        default:
          return null;
      }
    })}
  </ArtistCopyBlocks>
);

export default ArtistCopyContent;
