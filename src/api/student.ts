// 学生数据 API 接口
import type { RequestType, ResponseType } from '../components/zjwComp/index';

/**
 * 响应的学生数据类型
 */
export type Student = {
  id: number;
  name: string;
  studentNo: string;
  age: number;
  gender: 'male' | 'female';
  class: string;
  grade: string;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive' | 'graduated';
};

/**
 * 搜索的参数类型
 */
export interface StudentSearchParams  {
  name?: string;
  studentNo?: number;
  class?: string;
  grade?: string;
  status?: string;
  time?: string;
};

/**
 * 添加学生的参数类型（id 会自动生成）
 */
export type AddStudentParams = Omit<Student, 'id'>;


// 生成模拟学生数据
const generateMockStudents = (page: number, pageSize: number): Student[] => {
  const firstNames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '马', '朱', '胡', '郭', '何', '林', '罗', '梁'];
  const lastNames = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '洋', '艳', '勇', '涛', '鹏', '秀英', '霞', '平', '刚', '桂英', '建华', '文'];
  const classes = ['计算机科学1班', '计算机科学2班', '软件工程1班', '软件工程2班', '人工智能1班', '数据科学1班'];
  const grades = ['2021级', '2022级', '2023级', '2024级'];
  const addresses = [
    '北京市朝阳区', '上海市浦东新区', '广州市天河区', '深圳市南山区',
    '杭州市西湖区', '成都市武侯区', '武汉市洪山区', '西安市雁塔区',
    '南京市鼓楼区', '重庆市渝北区', '天津市南开区', '青岛市市南区'
  ];

  const students: Student[] = [];
  const startIndex = (page - 1) * pageSize;

  for (let i = 0; i < pageSize; i += 1 ) {
    const index = startIndex + i;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = firstName + lastName;

    students.push({
      id: index + 1,
      name: name,
      studentNo: `2024${String(index + 1).padStart(4, '0')}`,
      age: Math.floor(Math.random() * 5) + 18, // 18-22岁
      gender: Math.random() > 0.5 ? 'male' : 'female',
      class: classes[Math.floor(Math.random() * classes.length)],
      grade: grades[Math.floor(Math.random() * grades.length)],
      phone: `1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      email: `student${index + 1}@example.com`,
      address: addresses[Math.floor(Math.random() * addresses.length)],
      date: Date.now(),
      enrollmentDate: 1765550599763,
      status: ['active', 'active', 'active', 'inactive'][Math.floor(Math.random() * 4)] as Student['status']
    });
  }

  return students;
};

// 模拟总数据量
const TOTAL_STUDENTS = 156;

/**
 * 获取学生列表（支持分页）
 * @param params 分页参数
 * @param searchParams 搜索参数（可选）
 * @returns Promise<StudentListResponse>
 */
export const getStudentList = async (params: RequestType<StudentSearchParams>): Promise<ResponseType<Student>> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // 生成模拟数据
    let students = generateMockStudents(params.page, params.size);

    // 应用搜索过滤
    if (params.name) {
      students = students.filter(student =>
        student.name.includes(params.name!)
      );
    }
    if (params.studentNo) {
      students = students.filter(student =>
        student.studentNo.includes(params.studentNo!.toString())
      );
    }
    if (params.class) {
      students = students.filter(student =>
        student.class === params.class
      );
    }
    if (params.grade) {
      students = students.filter(student =>
        student.grade === params.grade
      );
    }
    if (params.status) {
      students = students.filter(student =>
        student.status === params.status
      );
    }
    const filteredTotal = params.name || params.studentNo || params.class || params.grade || params.status ? students.length : TOTAL_STUDENTS;
    return {
      code: 200,
      data: {
        data: students,
        pagination: {
          page: params.page,
          size: params.size,
          total: filteredTotal
        }
      },
      msg: '获取学生列表成功'
    };
  } catch {
    return {
      code: 500,
      data: {
        data: [],
        pagination: {
          page: params.page,
          size: params.size,
          total: 0
        }
      },
      msg: '获取学生列表失败'
    };
  }
};

/**
 * 添加学生
 * @param studentData 学生数据
 * @returns Promise<ResponseType<Student>>
 */
export const addStudent = async (studentData: AddStudentParams): Promise<ResponseType<Student>> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // 验证必填字段
    if (!studentData.name || !studentData.studentNo) {
      return {
        code: 500,
        data: null,
        msg: '学生姓名和学号为必填项'
      };
    }

    // 模拟检查学号是否已存在
    if (Math.random() > 0.9) {
      return {
        code: 500,
        data: null,
        msg: '学号已存在，请使用其他学号'
      };
    }


    return {
      code: 200,
      data: null,
      msg: '添加学生成功'
    };
  } catch  {
    return {
      code: 500,
      data: null,
      msg: '添加学生失败'
    };
  }
};
