<script lang="ts">
  const base = import.meta.env.BASE_URL;
</script>

<a class="creator-code" href="https://store.techtreegames.com/thetower/" target="_blank" rel="noopener noreferrer" title="Use code JDEVO in the in-game webstore to support the project" aria-label="Creator Code JDEVO (opens in a new tab)">
  <img src={`${base}tower-logo.webp`} alt="" width="22" height="22" />
  <span class="stack"><span class="label">Creator Code</span><strong>JDEVO</strong></span>
</a>

<style>
  .creator-code{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:5px 8px;border-radius:7px;color:#edf3ed;white-space:nowrap}
  .creator-code:hover{background:#ffffff12}
  img{display:block;object-fit:contain;flex:none}
  .stack{display:flex;flex-direction:column;gap:2px;line-height:1.15}
  .label{font-size:12px;color:#c1cdc5}
  strong{font-size:15px;font-weight:750;letter-spacing:.3px}
</style>
