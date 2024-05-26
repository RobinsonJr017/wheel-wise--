export interface Moto {
  id: number;
  created_at: string; // Asumiendo que `timestamp with time zone` se representará como una cadena
  nombre: string | null;
  descripcion_corta: string | null;
  modelo: number | null;
  precio_moto: number | null;
  precio_papeles: number | null;
  cilindraje: number | null;
  tipo_motor: string | null;
  potencia_maxima_hp: number | null;
  potencia_maxima_rpm: number | null;
  torque_maximo_nm: number | null;
  torque_maximo_rpm: number | null;
  relacion_compresion: string | null;
  peso: number | null;
  certificacion: string | null;
  marca: string | null;
  transmision: string | null;
  tipo_arranque: string | null;
  estilo: string | null;
}
