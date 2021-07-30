const $siteList = $('.siteList')
const $listLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.com' },
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const jianhua = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    //找到siteList里面的所有项  但要忽略last
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${jianhua(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                             <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($listLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()



//第一步 得到网址  把他插在添加按钮的前面   但是
$('.addButton').on('click', () => {
    let url = window.prompt("请问你要添加什么网址？")
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    //找
    //const $siteList = $('.siteList')  放上面
    //在siteList里面找去li.last
    //const $listLi = $siteList.find('li.last')
    //生成网址卡片后  插到listLi前面

    hashMap.push({
        logo: jianhua(url)[0].toUpperCase(),
        url: url
    });
    render()

    //     const $li = $(`
    //             <li>
    //                 <a href="${node.url}">
    //                     <div class="site">
    //                         <div class="logo">${node.url[0]}</div>
    //                         <div class="link">${node.url}</div>
    //                     </div>
    //                 </a>
    //             </li>
    //     `).insertBefore($listLi)
});

//js用户关闭网页之前出发什么window.onbeforeunload     走之前要存一下hasMap   存在那里呢ocalStorage 只能存字符串  
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    //在本地的存储里面设置x 他的值就是 string
    localStorage.setItem('x', string)
}

//键盘事件
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})