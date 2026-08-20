import React from 'react';
import {CrosswordGame} from '../games/Crossword/CrosswordGame';
import {PasswordCreatorGame} from '../games/PasswordCreator/PasswordCreatorGame';
import {DownloadTrafficGame} from '../games/DownloadTraffic/DownloadTrafficGame';
import {HammingDistanceGame} from '../games/HammingDistance/HammingDistanceGame';
import { InternetConnectionGame } from '../games/InternetConnection/InternetConnectionGame';

export const gameRegistry: Record<string, React.ComponentType<any>> = {
  crossword: CrosswordGame,
  passwordcreator: PasswordCreatorGame,
  downloadtraffic: DownloadTrafficGame,
  hammingdistance: HammingDistanceGame,
  connectiontypes: InternetConnectionGame,
};