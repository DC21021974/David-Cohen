export type CadreReferentiel = 'PER' | 'CER' | 'IB' | 'MIXTE';

export interface ObjectifItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface CapaciteTransversaleItem {
  id: string;
  nom: string;
  description: string;
  checked: boolean;
}

export interface PhasePlanification {
  id: string;
  phaseDuree: string;
  objectifsActivites: string;
  roleProf: string;
  outilsSAMR: string;
  cuaDifferenciation: string;
  checked: boolean;
}

export interface CritereEvaluation {
  id: string;
  critere: string;
  indicateurs: string;
  insuffisant: string;
  partiel: string;
  atteint: string;
  depasse: string;
}

export interface RessourceLien {
  id: string;
  titre: string;
  url: string;
  description: string;
  type?: string;
  qrCodeDataUrl?: string;
}

export interface PedagogicalSequence {
  id: string;
  isViergeTemplate?: boolean;
  enTete: {
    titre: string;
    discipline: string;
    niveau: string;
    duree: string;
    cadreReferentiel: CadreReferentiel;
    auteur?: string;
    objectifs: ObjectifItem[];
  };
  cadrePedagogique: {
    capacitesTransversales: CapaciteTransversaleItem[];
    formationGenerale: string;
    conceptsIB: {
      conceptCle: string;
      conceptsConnexes: string;
      contexteMondial: string;
    };
  };
  planification: {
    mode: 'tableau' | 'narratif';
    phases: PhasePlanification[];
  };
  evaluation: {
    dispositifsFormatifs: string;
    tacheSommative: string;
    grilleCriteriee: CritereEvaluation[];
  };
  differenciation: {
    mesuresAdaptation: string;
    remédiation: string;
  };
  enrichissement: {
    pistesApprofondissement: string;
  };
  ressources: RessourceLien[];
}

export type ViewFormat = 'standard' | 'diaporama' | 'tableau_word';
