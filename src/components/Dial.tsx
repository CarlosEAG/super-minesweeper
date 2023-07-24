import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useGameContext } from "../hooks/useGameContext";
import { GAME_STATE } from "../models/GameState";

const actions = [
    { icon: <SettingsIcon />, name: 'Settings' },
    { icon: <QuestionMarkIcon />, name: 'How to Play' },
    //{ icon: <InfoIcon />, name: 'Info' },
    { icon: <GitHubIcon />, name: 'GitHub'},
  ];
  
export const Dial= () => {
    const {gameState:{state}} = useGameContext();
    return state=== GAME_STATE.MAIN ? <></> : (
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
            />
          ))}
        </SpeedDial>
    );
  }