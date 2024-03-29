import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

// assets
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionItem = {
  id: string;
  title: React.ReactElement | string;
  content: React.ReactElement | string;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpand?: boolean | undefined;
};

export interface accordionProps {
  data: AccordionItem[];
  defaultExpandedId?: string | boolean | null;
  expandIcon?: React.ReactElement;
  square?: boolean;
  toggle?: boolean;
}

// ==============================|| ACCORDION ||============================== //

const Accordion = ({
  data,
  defaultExpandedId = null,
  expandIcon,
  square,
  toggle,
}: accordionProps) => {
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<string | boolean | null>(null);
  const handleChange =
    (panel: string) =>
    (_event: React.SyntheticEvent<Element, Event>, newExpanded: boolean) => {
      toggle && setExpanded(newExpanded ? panel : false);
    };

  React.useEffect(() => {
    setExpanded(defaultExpandedId);
  }, [defaultExpandedId]);

  return (
    <Box sx={{ width: "100%" }}>
      {data &&
        data.map((item: AccordionItem) => (
          <MuiAccordion
            key={item.id}
            defaultExpanded={!item.disabled && item.defaultExpand}
            expanded={
              (!toggle && !item.disabled && item.expanded) ||
              (toggle && expanded === item.id)
            }
            disabled={item.disabled}
            square={square}
            onChange={handleChange(item.id)}
          >
            <MuiAccordionSummary
              expandIcon={
                expandIcon || expandIcon === false ? (
                  expandIcon
                ) : (
                  <ExpandMoreIcon />
                )
              }
              sx={{
                color: theme.palette.mode === "dark" ? "grey.500" : "grey.800",
                fontWeight: 500,
              }}
            >
              {item.title}
            </MuiAccordionSummary>
            <MuiAccordionDetails>{item.content}</MuiAccordionDetails>
          </MuiAccordion>
        ))}
    </Box>
  );
};

export default Accordion;
