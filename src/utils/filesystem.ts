import * as FileSystem from 'expo-file-system';

export const writeAsStringAsync = async (fileDir: string, fileName: string, data: string) => {
  if (!(await FileSystem.getInfoAsync(fileDir)).exists)
    await FileSystem.makeDirectoryAsync(fileDir);
  await FileSystem.writeAsStringAsync(fileDir + fileName, data);
};
