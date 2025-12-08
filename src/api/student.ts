// 学生数据 API 接口

export interface Student {
  id: string;
  name: string;
  studentNo: string;
  age: number;
  gender: 'male' | 'female';
  class: string;
  grade: string;
  phone: string;
  email: string;
  address: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
}

export interface PaginationParams {
  current: number;
  pageSize: number;
}

export interface StudentListResponse {
  success: boolean;
  data: {
    list: Student[];
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
  message: string;
}

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

  for (let i = 0; i < pageSize; i++ ) {
    const index = startIndex + i;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = firstName + lastName;

    students.push({
      id: `student_${index + 1}`,
      name: name,
      studentNo: `2024${String(index + 1).padStart(4, '0')}`,
      age: Math.floor(Math.random() * 5) + 18, // 18-22岁
      gender: Math.random() > 0.5 ? 'male' : 'female',
      class: classes[Math.floor(Math.random() * classes.length)],
      grade: grades[Math.floor(Math.random() * grades.length)],
      phone: `1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      email: `student${index + 1}@example.com`,
      address: addresses[Math.floor(Math.random() * addresses.length)],
      enrollmentDate: '2024-09-01',
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
export const getStudentList = async (
  params: PaginationParams,
  searchParams?: {
    name?: string;
    studentNo?: string;
    class?: string;
    grade?: string;
    status?: string;
  }
): Promise<StudentListResponse> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

  try {
    // 生成模拟数据
    let students = generateMockStudents(params.current, params.pageSize);

    // 应用搜索过滤
    if (searchParams) {
      if (searchParams.name) {
        students = students.filter(student =>
          student.name.includes(searchParams.name!)
        );
      }
      if (searchParams.studentNo) {
        students = students.filter(student =>
          student.studentNo.includes(searchParams.studentNo!)
        );
      }
      if (searchParams.class) {
        students = students.filter(student =>
          student.class === searchParams.class
        );
      }
      if (searchParams.grade) {
        students = students.filter(student =>
          student.grade === searchParams.grade
        );
      }
      if (searchParams.status) {
        students = students.filter(student =>
          student.status === searchParams.status
        );
      }
    }

    // 如果有搜索条件，重新计算总数
    const total = searchParams ? students.length : TOTAL_STUDENTS;

    return {
      success: true,
      data: {
        list: students,
        pagination: {
          current: params.current,
          pageSize: params.pageSize,
          total: total
        }
      },
      message: '获取学生列表成功'
    };
  } catch (_err) {
    return {
      success: false,
      data: {
        list: [],
        pagination: {
          current: params.current,
          pageSize: params.pageSize,
          total: 0
        }
      },
      message: '获取学生列表失败'
    };
  }
};

/**
 * 获取学生详情
 * @param studentId 学生ID
 * @returns Promise<{success: boolean, data: Student | null, message: string}>
 */
export const getStudentDetail = async (
  studentId: string
): Promise<{success: boolean; data: Student | null; message: string}> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 100));

  try {
    // 从第一页开始查找学生（实际项目中应该从数据库查找）
    const allStudents = generateMockStudents(1, 100);
    const student = allStudents.find(s => s.id === studentId);

    if (student) {
      return {
        success: true,
        data: student,
        message: '获取学生详情成功'
      };
    } else {
      return {
        success: false,
        data: null,
        message: '学生不存在'
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '获取学生详情失败'
    };
  }
};

/**
 * 导出学生数据（模拟）
 * @param searchParams 搜索参数
 * @returns Promise<{success: boolean, message: string}>
 */
export const exportStudents = async (
  searchParams?: any
): Promise<{success: boolean; message: string}> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

  return {
    success: true,
    message: '学生数据导出成功'
  };
};