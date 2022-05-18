<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	 @import "uview-ui/index.scss";
	 @import url("common/iconfont/iconfont.css");
	/*每个页面公共css */
	.line {
		width: 750rpx;
		height: 1px;
		background-color: #DCDFE6;
	}
	.collect_status{
		/* color: deeppink; */
		font-size: 16px;
	}
	.collec_true{
		color: $uni-color-primary;
	}
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
		background-color: $uni-color-primary;
	}
</style>
