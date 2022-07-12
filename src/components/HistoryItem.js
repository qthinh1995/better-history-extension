import { useMemo, useState } from "react";
import styled from "styled-components";
import chroma from "chroma-js";

const colorPalettes = [
  "#94B49F",
  "#CEE5D0",
  "#FCF8E8",
  "#ECB390",
  "#CCD6A6",
  "#DAE2B6",
  "#DFE8CC",
  "#F7EDDB",
  "#F5F0BB",
  "#C4DFAA",
  "#90C8AC",
  "#73A9AD",
  "#54BAB9",
  "#18978F",
  "#E9DAC1",
  "#F7ECDE",
];
const borderColors = colorPalettes.map((x) => chroma(x).darken().hex());

const HistoryItemStyled = styled.a`
  border: 3px solid;
  border-radius: 10px;
  background: white;
  display: inline-block;
  padding: 14px;
  padding-right: 20px;
  max-width: 400px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 18px;
  font-weight: 500;
  position: relative;

  ${colorPalettes.map(
    (color, index) => `
  &.palette-${index}{
    background: ${color};
    border-color: ${borderColors[index]};
    color: ${chroma(color).luminance() > 0.5 ? "black" : "white"}
  }
  `
  )}
`;

const ParentWrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: 5px;
  margin-bottom: 5px;

  .children-wrapper {
    position: relative;
    left: 10%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    zoom: 0.95;
  }

  .expand-icon {
    position: absolute;
    top: 10px;
    left: calc(100% - 20px);
    font-size: 30px;
    cursor: pointer;

    &.expand {
      transform: rotate(90deg);
    }
  }
`;

const HistoryItem = ({ title, url, children }) => {
  const [expand, setExpand] = useState(true);
  const currentPalette = useMemo(
    () => Math.round(Math.random() * (colorPalettes.length - 1)),
    []
  );
  const toggleExpand = () => {
    setExpand((x) => !x);
  };
  return (
    <ParentWrapperStyled>
      <HistoryItemStyled
        href={url}
        className={`palette-${currentPalette}`}
        onClick={toggleExpand}
      >
        {title || url}
        {children && (
          <div
            className={`expand-icon ${expand ? "expand" : ""}`}
            onClick={toggleExpand}
          >
            &#10095;
          </div>
        )}
      </HistoryItemStyled>

      {children && expand && (
        <div className="children-wrapper">
          {children.map((x) => (
            <HistoryItem {...x} />
          ))}
        </div>
      )}
    </ParentWrapperStyled>
  );
};
export default HistoryItem;
