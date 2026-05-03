export const getMetadataItems = (
  templateTitle = "",
  templateDescription = "",
  slug = "",
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://etc.vercel.app"
      : "http://localhost:3000");

  const pathname = `${baseUrl}${slug}`;

  const title = templateTitle
    ? `${templateTitle} | ETC`
    : "ETC | Elite TC Champions";

  const description =
    templateDescription ||
    "ETC adalah platform untuk membantu mahasiswa menemukan tim, mencari partner, dan merekrut anggota untuk berbagai kebutuhan seperti lomba, proyek kampus, dan side project.";

  return {
    title,
    templateTitle,
    description,
    pathname,
  };
};
