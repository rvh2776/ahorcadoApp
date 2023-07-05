
let words:string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'PAPAYA',
    'VEHICULO',
    'ANIMAL',
    'VETERINARIO',
    'CELULAR',
    'TELEFONO',
    'PAYASO',
];

export const getRandomWord = () => {

    const randomIndex = (Math.floor(Math.random() * words.length));

  return words[randomIndex];
}
