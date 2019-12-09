/**
 * 左侧导航的数据
 */
const menuList = [
    {
        title:'首页',   // 菜单标题
        key:'/home',   // 对应的path
        icon:'home'   // 图标名称
    },
    {
        title:'商品',
        key:'/products',
        icon:'appstore',
        children:[   // 子菜单列表
            {
                title:'品类管理',
                key:'/category',
                icon:'bars'
            },
            {
                title:'商品管理',
                key:'/product',
                icon:'tool'
            }
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:'appstore',
    },
    {
        title:'角色管理',
        key:'/role',
        icon:'appstore',
    },
    {
        title:'图形图表',
        key:'/charts',
        icon:'appstore',
        children:[   // 子菜单列表
            {
                title:'柱状图',
                key:'/charts/bar',
                icon:'bars'
            },
            {
                title:'折线图',
                key:'/charts/line',
                icon:'tool'
            },
            {
                title:'饼图',
                key:'/charts/pie',
                icon:'tool'
            },
            {
                title:'折线图1',
                key:'/charts/line1',
                icon:'tool'
            }
        ]
    },
]
export default menuList;