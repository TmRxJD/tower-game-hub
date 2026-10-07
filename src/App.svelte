<script lang="ts">
  import games from './games.json';
  import CreatorCode from './CreatorCode.svelte';
  import backgrounds from './backgrounds.json';
  let motion = $state(true);
  const base = import.meta.env.BASE_URL;
  function chooseBackground() {
    let choices = backgrounds;
    try {
      const previous = sessionStorage.getItem('tower-arcade-background');
      choices = backgrounds.filter(image => image !== previous);
    } catch { /* Random selection still works when storage is unavailable. */ }
    const image = choices[Math.floor(Math.random() * choices.length)];
    try { sessionStorage.setItem('tower-arcade-background', image); } catch { /* Optional refresh history. */ }
    return image;
  }
  const background = chooseBackground();
</script>
<svelte:head><meta property="og:title" content="Tower Arcade" /><meta property="og:description" content="Six mini games inspired by The Tower. Play on desktop or mobile." /></svelte:head>
<div class="backdrop" aria-hidden="true" style:background-image={`linear-gradient(180deg, rgba(5,10,18,.74), rgba(5,10,18,.86)), url('${base}backgrounds/${background}')`}></div>
<div class="page">
  <header>
    <a class="wordmark" href={base} aria-label="Tower Arcade home"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 26h18M10 26V12l6-7 6 7v14M13 16h6M13 21h6" /></svg>TOWER<span>ARCADE</span></a>
    <div class="header-actions"><CreatorCode /><a class="header-link" href="#games">Explore the games <span aria-hidden="true">↙</span></a></div>
  </header>
  <main>
    <section class="intro" aria-labelledby="title">
      <div class="eyebrow"><span class="signal"></span> Independent fan games</div>
      <h1 id="title">Mini games inspired by<br /><span>The Tower.</span></h1>
      <div class="intro-bottom"><p>Six ways to play with familiar Tower ideas.<br class="desktop-break" /> Pick a game and play full screen, on desktop or mobile.</p><div class="platforms"><span>Desktop + mobile</span><span>Play in your browser <b aria-hidden="true">↗</b></span></div></div>
    </section>
    <section id="games" aria-label="Game collection">
      <div class="collection-bar"><span class="collection-label">The collection / 6 games</span><button class="motion" aria-pressed={!motion} onclick={() => motion = !motion}>{motion ? 'Pause previews' : 'Play previews'} <span aria-hidden="true">{motion ? 'Ⅱ' : '▷'}</span></button></div>
      <div class="grid">
        {#each games as game, index (game.id)}
          <article style={`--accent:${game.color}`}>
            <a class="preview" href={game.url} target="_blank" rel="noopener noreferrer" aria-label={`Play ${game.name} (opens in a new tab)`}>
              <picture>{#if game.id !== 'bemerged' && game.id !== 'inner-land-minesweeper'}<source type="image/webp" srcset={`${base}previews/${game.id}${motion ? '-animated' : ''}.webp`} />{/if}<img src={`${base}previews/${game.id}.${motion ? 'gif' : 'webp'}`} alt={`${game.name} gameplay preview`} width="960" height="540" loading={index < 3 ? 'eager' : 'lazy'} /></picture>
              <span class="genre">{game.genre}</span><span class="launch" aria-hidden="true">↗</span>
            </a>
            <div class="card-body"><p class="tag">{game.tag}</p><div class="card-title"><h2>{game.name}</h2></div><p class="description">{game.description}</p><div class="card-footer"><span>{game.controls}</span><a href={game.url} target="_blank" rel="noopener noreferrer">Play now <span aria-hidden="true">↗</span><span class="sr-only"> — {game.name}, opens in a new tab</span></a></div></div>
          </article>
        {/each}
      </div>
    </section>
  </main>
  <footer><CreatorCode /><a class="footer-brand" href={base}>TOWER ARCADE</a><p>Independent fan games inspired by The Tower.</p><span>Every game opens in a new tab. Stay for another run.</span></footer>
</div>
<style>
  :global(*){box-sizing:border-box} :global(html){scroll-behavior:smooth;scroll-padding-top:24px} :global(body){margin:0;background:#0b1016;color:#f1f4ea;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased} :global(button),:global(a){-webkit-tap-highlight-color:transparent} :global(a){color:inherit;text-decoration:none} :global(button){font:inherit;cursor:pointer} :global(:focus-visible){outline:2px solid #c6fb76;outline-offset:5px} :global(::selection){background:#c6fb76;color:#10150e}
  .backdrop{position:fixed;inset:0;z-index:0;pointer-events:none;background-size:cover;background-position:center}.page{position:relative;z-index:1;max-width:1440px;margin:auto;padding:0 clamp(20px,5vw,76px)}header{height:100px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ffffff14}.wordmark{display:flex;gap:8px;align-items:center;font-size:14px;font-weight:850;letter-spacing:1.4px}.wordmark span{color:#b6c1b4;font-weight:450;margin-left:2px}.wordmark svg{width:32px;height:32px;fill:none;stroke:#c6fb76;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round}.header-link{color:#c0cbc4;font-size:14px;display:flex;gap:20px;align-items:center;min-height:44px}.header-link span{font-size:22px;color:#c6fb76}.intro{padding:42px 0 32px}.eyebrow{display:flex;align-items:center;gap:9px;font-size:13px;font-family:inherit;letter-spacing:.5px;color:#b7c6b8}.signal{width:6px;height:6px;border-radius:50%;background:#c6fb76;box-shadow:0 0 12px #c6fb7640}h1{font-size:clamp(38px,5vw,68px);line-height:.99;letter-spacing:-.045em;font-weight:650;margin:25px 0 28px}h1 span{color:#c6fb76}.intro-bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}.intro-bottom p{color:#a5b0aa;font-size:14px;line-height:1.8;margin:0}.platforms{display:flex;flex-direction:column;gap:11px;font-size:13px;font-family:inherit;letter-spacing:.3px;color:#becbc2}.platforms b{color:#c6fb76;margin-left:12px}.collection-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #ffffff14;padding:24px 0}.motion{display:flex;gap:12px;align-items:center;border:0;background:transparent;color:#9eaba3;font-size:12px;min-height:44px;padding:8px}.motion span{color:#d2dccb;font-size:15px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px 24px}article{border:1px solid #ffffff16;border-radius:12px;overflow:hidden;background:#10171ff5;container-type:inline-size;transition:border-color .2s,transform .2s}article:hover{border-color:var(--accent);transform:translateY(-3px)}.preview{display:block;position:relative;aspect-ratio:16/9;background:#080d12;overflow:hidden}.preview picture,.preview img{display:block;width:100%;height:100%;object-fit:cover}.preview:after{content:'';position:absolute;inset:60% 0 0;background:linear-gradient(transparent,#080d1299);pointer-events:none}.genre{position:absolute;bottom:15px;left:18px;z-index:1;background:#10171ee6;border:1px solid #ffffff20;border-radius:5px;padding:6px 8px;font-size:13px;font-family:inherit;color:#dce4d9}.launch{position:absolute;right:18px;bottom:15px;z-index:1;display:grid;place-items:center;width:32px;height:32px;border:1px solid #ffffff40;border-radius:50%;background:#080d1280;font-size:20px;color:var(--accent)}.card-body{padding:23px 24px}.tag{margin:0 0 9px;color:var(--accent);font-size:13px;font-family:inherit;letter-spacing:.3px;font-weight:600}.card-title{display:flex;gap:15px;align-items:center;justify-content:space-between}h2{font-size:clamp(22px,4cqw,28px);font-weight:600;letter-spacing:-.3px;margin:0}.description{font-size:14px;line-height:1.7;color:#bcc7c0;min-height:100px;margin:13px 0 22px;max-width:47ch}.card-footer{display:flex;align-items:center;justify-content:space-between;gap:14px;padding-top:15px;border-top:1px solid #ffffff10}.card-footer>span{font-size:13px;font-family:inherit;color:#82968a;max-width:65%;line-height:1.7}.card-footer a{font-size:13px;font-weight:650;display:flex;gap:10px;align-items:center;min-height:44px;white-space:nowrap;color:var(--accent)}.card-footer a span{font-size:18px}footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;border-top:1px solid #ffffff14;margin-top:65px;padding:30px 0 35px;color:#bac7bf;font-size:12px}.footer-brand{display:flex;align-items:center;min-height:44px;color:#b7c6b8;font-size:13px;font-family:inherit;letter-spacing:.3px}footer p{margin:0}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  @media(max-width:1000px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){header{height:76px}.header-link{font-size:12px;gap:10px}.intro{padding-top:42px}.intro-bottom{align-items:flex-start;flex-direction:column;gap:22px}.platforms{flex-direction:row;gap:20px;font-size:12px}.desktop-break{display:none}.grid{grid-template-columns:1fr;gap:22px}.collection-bar{padding:18px 0}.motion{font-size:12px;gap:7px;padding:4px}.card-body{padding:21px}.description{min-height:0}footer{margin-top:40px;align-items:flex-start;flex-direction:column}}@media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}article{transition:none}article:hover{transform:none}}
  .collection-bar{flex-wrap:wrap}.motion{font-size:12px;padding:9px 12px;border:1px solid #334239;border-radius:30px;background:#10171f;color:#c2cec6;white-space:nowrap}.card-footer>span{font-size:13px;line-height:1.65;color:#a5b5ab}
  @media(max-width:650px){.motion{font-size:11px;padding:9px 12px;margin-left:auto}}
.collection-label{font-size:13px;font-family:inherit;letter-spacing:.3px;color:#a5b5ab}
.header-actions{display:flex;align-items:center;gap:24px}
@media(max-width:650px){.header-actions{gap:0}.header-link{display:none}.wordmark{font-size:12px;letter-spacing:.8px;gap:5px}.wordmark svg{width:26px;height:26px}}
</style>
