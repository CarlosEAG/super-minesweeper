import { Paper, styled } from "@mui/material";
import { motion } from "framer-motion";

const CustomPaper = styled(Paper)({
    width: 'fit-content',
    borderRadius: 10,
    borderWidth: 'thick',
    borderStyle: 'inset',
    zIndex: 1,
  });
  const MotionPaper = motion(CustomPaper);
  export default MotionPaper;