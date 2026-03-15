-- Create table for umrah programs
CREATE TABLE public.umrah_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_program TEXT NOT NULL,
  slug_url TEXT NOT NULL UNIQUE,
  poster_image TEXT NOT NULL,
  subtitle TEXT,
  bulan_keberangkatan TEXT NOT NULL,
  durasi_hari TEXT NOT NULL,
  harga_mulai TEXT NOT NULL,
  kota_keberangkatan TEXT NOT NULL DEFAULT 'Jakarta (CGK)',
  hotel_makkah TEXT NOT NULL,
  hotel_madinah TEXT NOT NULL,
  maskapai TEXT NOT NULL,
  bonus_program TEXT,
  harga_detail JSONB DEFAULT '[]'::jsonb,
  fasilitas_include TEXT[] DEFAULT '{}',
  fasilitas_exclude TEXT[] DEFAULT '{}',
  catatan_program TEXT[] DEFAULT '{}',
  rekening_pembayaran JSONB DEFAULT '[]'::jsonb,
  whatsapp_booking_link TEXT NOT NULL DEFAULT 'https://wa.me/6281234567890',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.umrah_programs ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view active programs)
CREATE POLICY "Anyone can view active programs"
  ON public.umrah_programs
  FOR SELECT
  USING (is_active = true);

-- Create timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_umrah_programs_updated_at
  BEFORE UPDATE ON public.umrah_programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();