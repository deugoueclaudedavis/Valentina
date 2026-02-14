import React, { useEffect, useState } from "react";

const text = `
 Depuis que tu es entrée dans ma vie,
les choses ont une saveur différente…
plus douce, plus lumineuse.

Il y a dans ton sourire une chaleur
qui apaise mes journées,
et dans ton regard une profondeur
qui me donne envie de m’y perdre un instant…
puis de rester.

Avec toi, les moments simples
deviennent précieux.
Les silences ne sont plus vides,
ils sont remplis d’une présence qui fait du bien.

Et parfois, sans même que tu le saches,
il y a cette envie naturelle de te garder tout près de moi,
de te serrer doucement dans mes bras
comme si le monde pouvait attendre un peu.

Continue simplement d’être celle que tu es…
c’est déjà tout ce qu’il faut.
`;

const ValentineLetter: React.FC = () => {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>À toi, jolie dame</h1>

        <p style={styles.letter}>
          {displayedText}
        </p>

        <p style={styles.signature}>
          — Claude ❤️
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffe5ec, #ffc2d1)",
    fontFamily: "Georgia, serif",
    padding: "20px"
  },
  card: {
    maxWidth: "650px",
    background: "#ffffff",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    animation: "fadeIn 1.5s ease-in-out"
  },
  title: {
    fontWeight: 400,
    marginBottom: "30px",
    color: "#5c1a33"
  },
  letter: {
    whiteSpace: "pre-line",
    lineHeight: 1.8,
    fontSize: "18px",
    color: "#5c1a33",
    minHeight: "250px"
  },
  signature: {
    marginTop: "40px",
    fontStyle: "italic",
    opacity: 0.8
  }
};

export default ValentineLetter;