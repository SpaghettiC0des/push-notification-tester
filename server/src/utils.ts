export function kbToBytes(kb: number) {
  return kb * 1000;
}

export function mbToBytes(mb: number) {
  return kbToBytes(mb * 1000);
}
