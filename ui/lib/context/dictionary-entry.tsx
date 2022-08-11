import { DetailDictionaryEntry } from "@/types/api/entry";
import { createContext, useContext } from "react";

// TODO: this should be moved to /lib
export const DictionaryEntryContext = createContext<DetailDictionaryEntry | undefined>(undefined);
export const useDictionaryEntryContext = () => useContext(DictionaryEntryContext);
