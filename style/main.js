
/**
 * *******************************
 * Common - 公共代码
 * *******************************
 */
ice(function(){
	//多标签开关
	if(ice('#tab-toggle').length){
		if(ice.data('adminTab') !== null){
			ice('#tab-toggle')[0].checked = ice.data('adminTab');
		}
		ice('.tab-toggle').click(function(){
			ice.data('adminTab', ice('#tab-toggle')[0].checked = !ice('#tab-toggle')[0].checked);
			window.location.href = adminXL.config.host;
		})
	}
})

//文档初始化
function docInit(){
	if(ice('.doc-menu').length){
		ice('.doc-menu').addCss('ani-up-in');
		var node = document.createDocumentFragment();
		ice('.title-l').each(function(i,obj){
			var li = ice.c('li');
			var a = ice.c('a');
			a.href = 'javascript:;';
			a.innerHTML = this.innerHTML;
			a.onclick = function(){
				console.log(window)
				console.log(ice.page(obj).y)
				
				ice.scrollAni(obj);
			}
			li.appendChild(a);
			node.appendChild(li);
		})
		ice('.doc-menu ul').append(node).fadeIn();
		ice('.doc-menu').show();
	}
}