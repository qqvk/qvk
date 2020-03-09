<template>
<main>
  <section class="card">
    <header>对音箱说</header>
    <div class="topic">
      <div class="content">小贝，我回来了</div>
      <span class="remove removetopic"></span>
    </div>
    <div class="topic">
      <div class="content">帮我定一个明天早上6点的闹钟</div>
      <span class="remove removetopic"></span>
    </div>
    <div class="button addtopic">
      <img src="//p0.ssl.qhimg.com/d/speaker/20190115/ic_circleadd_blue_2x.png">
      <span>添加说法</span>
    </div>
  </section>
  <section class="card">
    <header>音箱回应</header>
        <div class="reply">
          <span class="icon"><img src="//p0.ssl.qhimg.com/d/speaker/20190116/reply_talk_m_3x.png"></span>
          <div class="content">欢迎主人回家</div>
          <span class="remove removereply"></span>
        </div>
    <div class="button addreply">
      <img src="//p1.ssl.qhimg.com/d/speaker/20190115/ic_circleadd_blue_2x.png">
      <span>添加回应</span>
    </div>
  </section>

</main>
</template>
<style lang="scss">

body {
  padding: 30px;
  background-color: #f4f4f4;
  // 全局限制最小宽度为280像素
  min-width: 280px;
  font-family: 'PingFang SC';
  font-weight: 400;
  font-size: 32px;
}
section.delete {
  text-align: center;
  padding-top: 50px;
  a {
    width: 100px;
    display: inline-block;
    img {
      width: 100%;
    }
  }
}
section.card {
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 6px 0 rgba(0,0,0,0.02);
  text-align: center;
  padding: 38px 70px 46px;
  font-weight: 300;
  header {
    font-size: 28px;
    line-height: 28px;
    margin-bottom: 38px;
    color: #666;
  }
  .button {
    display: flex;
    color: #3ABEFF;
    font-size: 32px;
    align-items: center;
    justify-content: center;
    margin-top: 58px;
    img { 
      width: 44px;
      height: 44px;
      margin-right: 12px;
    }
  }
  .topic, .reply {
    display: flex;
    align-items: center;
    text-align: left;
    background: #F9F9F9;
    border: 1px solid rgb(226, 225, 225);
    border-radius: 100px;
    padding: 25px 0;
    margin-bottom: 20px;
    // 超出长度显示省略号
    .content {
      color: #333;
      font-weight: 400;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .remove, .icon {
      width: 44px;
      height: 44px;
    }
    .remove {
      // margin-left: 28px;
      background-image: url(https://p0.ssl.qhimg.com/d/lisongfeng/ic_del_line.png);
      background-size: 90%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
  .topic {
    .content {
      margin-left: 60px;
      width: 394px;
    }
  }
  .reply {
    .icon {
      margin-left: 30px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .content {
      width: 360px;
    }
  }
}
small.playHint {
  color: #999;
  font-weight: 300;
  font-size: 22px;
  margin-top: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 为测试用，临时添加的按钮
.test .create {
  position: relative;
  width: 90%;
  height: 3rem;
  margin: 3rem auto;
  line-height: 3rem;
  text-align: center;
  border-radius: 1.5rem;
}

</style>