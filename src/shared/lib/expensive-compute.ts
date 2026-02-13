export function computeRowDisplayScore(name: string, email: string): number {
  let score = 0;
  for (let i = 0; i < name.length; i++) {
    score += name.charCodeAt(i) * (i + 1);
  }
  for (let i = 0; i < email.length; i++) {
    score += email.charCodeAt(i) * 0.5;
  }
  return Math.floor(score % 100);
}
