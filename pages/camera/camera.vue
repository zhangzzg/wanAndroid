<template>
	 <view>
	        <live-pusher id='livePusher' ref="livePusher" class="livePusher" url=""
	        mode="SD" :muted="true" :enable-camera="true" :auto-focus="true" :beauty="1" whiteness="2"
	        aspect="9:16" @statechange="statechange" @netstatus="netstatus" @error = "error"
	        ></live-pusher>
	        <button class="btn" @click="start">开始推流</button>
	        <button class="btn" @click="pause">暂停推流</button>
	        <button class="btn" @click="resume">resume</button>
	        <button class="btn" @click="stop">停止推流</button>
	        <button class="btn" @click="snapshot">快照</button>
	        <button class="btn" @click="startPreview">开启摄像头预览</button>
	        <button class="btn" @click="stopPreview">关闭摄像头预览</button>
	        <button class="btn" @click="switchCamera">切换摄像头</button>
	    </view>
</template>

<script>
	export default {
		 data() {
					return {}
		        },
		        onReady() {
		            // 注意：需要在onReady中 或 onLoad 延时
					this.context = uni.createLivePusherContext("livePusher", this);
		        },
		        methods: {
		            statechange(e) {
		                console.log("statechange:",e);
		            },
		            netstatus(e) {
		                console.log("netstatus:",e);
		            },
		            error(e) {
		                console.log("error:" ,e);
		            },
		            start: function() {
		                this.context.start({
		                    success: (a) => {
		                        console.log("livePusher.start:",a);
		                    }
		                });
		            },
		            close: function() {
		                this.context.close({
		                    success: (a) => {
		                        console.log("livePusher.close:",a);
		                    }
		                });
		            },
		            snapshot: function() {
		                this.context.snapshot({
		                    success: (e) => {
		                        console.log("snapshot",e);
		                    }
		                });
		            },
		            resume: function() {
		                this.context.resume({
		                    success: (a) => {
		                        console.log("livePusher.resume:",a);
		                    }
		                });
		            },
		            pause: function() {
		                this.context.pause({
		                    success: (a) => {
		                        console.log("livePusher.pause:" ,a);
		                    }
		                });
		            },
		            stop: function() {
		                this.context.stop({
		                    success: (a) => {
		                        console.log("stop",a);
		                    }
		                });
		            },
		            switchCamera: function() {
		                this.context.switchCamera({
		                    success: (a) => {
		                        console.log("livePusher.switchCamera:" ,a);
		                    }
		                });
		            },
		            startPreview: function() {
		                this.context.startPreview({
		                    success: (a) => {
		                        console.log("livePusher.startPreview:",a);
		                    }
		                });
		            },
		            stopPreview: function() {
		                this.context.stopPreview({
		                    success: (a) => {
		                        console.log("livePusher.stopPreview:" ,a);
		                    }
		                });
		            }
		        }
	}
</script>

<style>
.livePusher{
	width: 100%;
}
</style>
