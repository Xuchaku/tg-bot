import * as fs from 'fs';
import { InputFile } from 'grammy';

export const readFileAsGrammy = (
   options: Parameters<typeof fs.readFileSync> = ['./assets/luna-menu.jpg'],
) => {
   const cache = new Map<string, InputFile>();
   return (): InputFile => {
      if (cache.has(options[0] as string)) {
         return cache.get(options[0] as string) as InputFile;
      }
      const fileMenu = fs.readFileSync(...options);
      const fileData = new Uint8Array(fileMenu as NonSharedBuffer);
      const file = new InputFile(fileData);

      return file;
   };
};
