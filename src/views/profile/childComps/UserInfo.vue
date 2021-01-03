<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="privateImage-svg left">
          <img src="~assets/img/profile/avatar.svg" alt="">
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" alt="">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="arrow-svg"><img src="~assets/img/common/arrow-left.svg" alt=""></div>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    position: relative;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
  }

  .left {
    float: left;
  }

  .left img {
    width: 100%;
    height: 100%;
  }

  #user-info .arrow-svg {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  .arrow-svg img {
    width: 100%;
    height: 100%;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone img {
    position: absolute;
    width: 30px;
    height: 18px;
    left: -24px;
    top: 0px;
  }
</style>
