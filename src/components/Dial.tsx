import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";

type baseAction = {
  icon: React.ReactNode,
  name: string,
  path?: string,
  url?: string,
}
interface action extends baseAction {
  path: string,
}
interface externalAction extends baseAction {
  url: string,
}
const actions: (action | externalAction)[] = [
    { icon: <SettingsIcon />, name: 'Settings', path: '/settings' },
    { icon: <QuestionMarkIcon />, name: 'How to Play', path: '/howTo' },
    { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/CarlosEAG/super-minesweeper'},
  ];

export const Dial= () => {
    const navigate = useNavigate();
    return (
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => action.path ? navigate(action.path) : window.open(action.url!, '_blank')}
            />
          ))}
        </SpeedDial>
    );
  }