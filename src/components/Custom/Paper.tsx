import { Paper, styled } from "@mui/material";
import { motion } from "framer-motion";

const CustomPaper = styled(Paper)({
    width: 'fit-content',
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 'thick',
    borderStyle: 'inset',
    zIndex: 1,
    boxShadow: '0px 0px 2px #fff, 0px 0px 10px #990099,0px 0px 15px #990099',
  });
  const MotionPaper = motion(CustomPaper);
  export default MotionPaper;