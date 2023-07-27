import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../hooks/useGameContext";

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
    { icon: <ReplayIcon />, name: 'Start a new game', path: '/play' },
    { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/CarlosEAG/super-minesweeper'},
  ];

export const Dial= () => {
    const {init} = useGameContext();
    const navigate = useNavigate();
    const handleActionClick = (action: action | externalAction) => {
      if(action.path) {
        navigate(action.path)
      } else {
        window.open(action.url!, '_blank')
      }
      if(action.path==='/play'){
        init();
      }
      
    }
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
              onClick={() => handleActionClick(action)}
            />
          ))}
        </SpeedDial>
    );
  }