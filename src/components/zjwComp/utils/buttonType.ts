// 作用：书写按钮区域的类型

export interface ButtonType {
    label: string;
    pos?: 'left' | 'right';
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text'
    /** 是否设置为危险按钮 */
    danger?: boolean;
    /** 幽灵属性，使按钮背景透明 */
    ghost?: boolean;
    /** 跳转 */
    href?: boolean;
    onClick?: () => void;
};
