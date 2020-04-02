<script>
export let title
const players = ['Mike', 'Joe', 'Helon']
</script>

<main>{title}</main>

<ol class="player">
{#each players as player, index}
<li>{player}</li>
{/each}
</ol>

<style>
@import url("https://use.fonts.360.cn/css?family=fz_jinglei&apiKey=a68ad05b55aeaa7d");
@import url("https://use.fonts.360.cn/css?family=fz_jinghei&apiKey=a68ad05b55aeaa7d");
main {
    font-family: fz_jinglei;
    font-size: 2rem;
    color: red;
}
.player {
    font-size: 1.2rem;
    font-family: fz_jinghei;
}
</style>