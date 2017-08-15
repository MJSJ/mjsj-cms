/**
 * Created by yf on 2017/8/15.
 * 导出组件,菜单项
 */
let components = {}, tabs = [], nav = [];
let nameList = ['专题管理','系统设置'];
let modules = ['subject', 'system'];

modules.forEach((item, idx)=>{
    let map = require(`./${item}/map`).default;
    let arr = [];
    map.forEach(ite=>{
        components[ite.id] = ite.component;
        arr.push({
            name: ite.name,
            id: ite.id
        });
    });
    tabs.push(arr);
    nav.push({
        id: item,
        name: nameList[idx],
        list: arr
    });
});

export {
    components,
    tabs,
    nav
}