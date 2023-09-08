import { ActionData } from './$types';

export type ShortpathAction = ActionData & ({ message: string } | { shortpath: string });
