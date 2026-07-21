import { useState, useEffect, useRef } from "react";
import usImage from "./assets/Us.png";
import musicaFile from "./assets/musica.mp3";
import "./App.css";

const Divider = () => (
  <div className="divider">
    <span className="divider-line"></span>
    <span className="divider-heart">♥</span>
    <span className="divider-line"></span>
  </div>
);

export default function App() {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [letterOpen, setLetterOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startDate = new Date("2025-07-11T00:00:00");

    const updateTimer = () => {
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const diffInMs = now.getTime() - startDate.getTime();
      const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffInMs / 1000 / 60) % 60);
      const seconds = Math.floor((diffInMs / 1000) % 60);

      setTime({ years, months, days, hours, minutes, seconds });
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [letterOpen]);

  const handleOpenLetter = () => {
    setLetterOpen(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <div className="hero-section">
        <img src={usImage} alt="Eu e Capricy" className="couple-photo" />
        <div className="heart">
          <svg viewBox="0 0 24 24" width="56" height="56" fill="#ff69b4">
            <path d="M12 21s-6.716-4.35-9.428-8.28C.94 10.02 1.2 6.5 4.2 4.9c2.4-1.28 5-0.4 6.8 1.7 1.8-2.1 4.4-2.98 6.8-1.7 3 1.6 3.26 5.12 1.63 7.82C18.72 16.65 12 21 12 21z" />
          </svg>
        </div>

        <h1 className="title">
          Para o amor da
          <br />
          minha vida!
        </h1>

        <p className="subtitle">🗓️ Juntos desde 11 de julho de 2025</p>

        <div className="cards-container">
          <div className="card">
            <span className="card-number">{time.years}</span>
            <span className="card-label">ANO(S)</span>
          </div>
          <div className="card">
            <span className="card-number">{time.months}</span>
            <span className="card-label">MESES</span>
          </div>
          <div className="card">
            <span className="card-number">{time.days}</span>
            <span className="card-label">DIAS</span>
          </div>
        </div>

        <div className="time-display">
          {String(time.hours).padStart(2, "0")} :{" "}
          {String(time.minutes).padStart(2, "0")} :{" "}
          {String(time.seconds).padStart(2, "0")}
        </div>
      </div>

      <div className="rest-section">
        <Divider />

        <div className="letter-section">
          {!letterOpen ? (
            <div className="envelope" onClick={handleOpenLetter}>
              <span className="envelope-icon">💌</span>
              <p>Adivinha a música que me fez gostar ainda mais de você?</p>
            </div>
          ) : (
            <div className="player-bar">
              <div className="player-controls">
                <button className="player-btn" onClick={togglePlay}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
              </div>
              <div className="player-time">
                {formatTime(progress)} / {formatTime(duration)}
              </div>
              <div className="player-track">
                <strong>Largado As Traças (Acústico)</strong>
                <p>No seu dispositivo</p>
              </div>
            </div>
          )}
        </div>

        <Divider />

        <div className="message-card">
          <p>
            Eu te amo tanto que estou disposto a nunca saber o que teria
            acontecido com todas as outras pessoas com quem talvez eu pudesse
            ter sido feliz, porque você é suficiente. Porque você é a minha
            escolha. E é isso que significa escolher. Isso é se comprometer de
            verdade. Digo isso porque vivemos em um mundo que o tempo todo tenta
            nos convencer do contrário: que mais é sempre melhor, que se algo se
            complica você deve trocar, que se um relacionamento não é perfeito é
            melhor procurar outro, e que existem milhares de opções, como se
            escolher apenas uma significasse perder tudo o que existe além. Mas
            eu não vejo assim. Para mim, amar não é ter todas as possibilidades
            do mundo abertas; é olhar para alguém e decidir, todos os dias, que
            nenhuma delas importa mais. É encontrar em uma única pessoa motivos
            suficientes para abrir mão de todas as outras histórias que poderiam
            ter sido. E, entre todas as vidas que eu poderia viver, entre todos
            os caminhos que eu poderia seguir e entre todas as pessoas que eu
            poderia conhecer, eu escolheria você. Não porque você seja a única
            opção, mas porque é a única que eu quero. Porque quando penso no meu
            futuro, é ao seu lado que ele faz sentido. E, se amar é escolher
            repetidamente a mesma pessoa, então eu escolho você hoje, amanhã e
            em todos os dias que vierem.
          </p>
        </div>
      </div>

      <audio ref={audioRef} src={musicaFile} preload="auto" />
    </div>
  );
}
