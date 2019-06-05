import cpy from 'cpy'

export const copyFilesToDrive = async ({
  files,
  drive,
  onProgress
}) => {
  await cpy(files, drive)
    .on('progress', progress => onProgress(progress))

  return true
}
