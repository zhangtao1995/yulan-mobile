<template>
  <div class="success">
    <top :top="set"></top>
    <div class="content">
      <div class="check"></div>
      <p>操作成功</p>
    </div>
  </div>
</template>

<script>
import top from "../components/Top";
export default {
  components: {
    top
  },
  data() {
    return {
      set: 1
    };
  },
  created() {
    setTimeout(() => {
      this.$router.push({
        path: "/client"
      });
    }, 1500);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.content {
  width: 100%;
  height: 667px;
  background: #efefef;
}
.check {
  position: absolute;
  background: url("../assets/circlecheck.png");
  height: 108px;
  width: 108px;
  background-size: 100% 100%;
  top: 201px;
  right: 133px;
  bottom: 358px;
  left: 133px;
}
.content p {
  position: absolute;
  top: 325px;
  bottom: 316px;
  right: 148px;
  left: 148px;
  font-size: 18px;
  color: #919191;
}
</style>