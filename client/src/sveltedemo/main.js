import App from './App.svelte'

export default new App({
    target: document.getElementById('app'),
    props: {
        title: '欢迎使用Svelte in qvk!'
    }
})