import { MinpopRecord } from "@/types/minpop";
import { TalinfRecord } from "@/types/talinf";

export const IWS_CONFIG = {
  TIMEOUT_MS: 30000,
  ENDPOINTS: {
    MINPOP: (empid: string) => `/minpop?empid=${empid}`,
    TALINF: (lotno: string) => `/talinf?lotno=${lotno}`,
  },
};

export const MOCK_MINPOP_DATA: MinpopRecord[] = [
  { P_EMPNAME: "I.KIDAKORN", P_ISFOUND: "1" },
  { P_EMPNAME: "R.Suda", P_ISFOUND: "1" },
  { P_EMPNAME: "Y.Anan", P_ISFOUND: "1" },
  { P_EMPNAME: "C.Amnart", P_ISFOUND: "1" },
  { P_EMPNAME: "S.Manee", P_ISFOUND: "1" }
];

export const MOCK_TALINF_DATA: TalinfRecord[] = [
  { P_DEVICECODE: "9656", P_WIPCODE: "420", P_ISFOUND: "1" },
  { P_DEVICECODE: "9657", P_WIPCODE: "421", P_ISFOUND: "1" },
  { P_DEVICECODE: "9658", P_WIPCODE: "422", P_ISFOUND: "1" },
  { P_DEVICECODE: "9659", P_WIPCODE: "423", P_ISFOUND: "1" },
  { P_DEVICECODE: "9660", P_WIPCODE: "424", P_ISFOUND: "1" }
];
