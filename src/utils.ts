import * as fs from 'fs';
import { InputFile } from 'grammy';

export const readFileAsGrammy = () => {
   const cache = new Map<string, InputFile>();
   return (options: Parameters<typeof fs.readFileSync> = ['./assets/luna-menu.jpg']): InputFile => {
      if (cache.has(options[0] as string)) {
         return cache.get(options[0] as string) as InputFile;
      }
      const fileMenu = fs.readFileSync(...options);
      const fileData = new Uint8Array(fileMenu as NonSharedBuffer);
      const file = new InputFile(fileData);

      cache.set(options[0] as string, file);

      return file;
   };
};
