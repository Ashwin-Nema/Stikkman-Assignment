import { HTTP_METHODS, fetchHandler } from '@/app/lib/request-handler';
import { backendUrls } from '@/app/lib/rest-urls';
import { toast } from 'react-toastify';

export const fetchData = async (id, setConfig) => {
  try {
    const response = await fetchHandler(`${backendUrls.getCourseById}${id}`);
    const result = await response.json();
    if (!response.ok) {
      toast.error(result.message, { autoClose: 2000 });
      setConfig({
        data: {},
        redirectToHome: true,
      });
      throw new Error('Network response was not ok');
    }
    setConfig({
      data: result,
    });
  } catch (error) {
    toast.error(error.message, { autoClose: 2000 });
  }
};

export const deleteCourse = async (id, setConfig) => {
  try {
    const response = await fetchHandler(
      `${backendUrls.deleteCourseById}${id}`,
      HTTP_METHODS.DELETE
    );
    if (response?.ok) {
      toast.success('Course deleted successfully', { autoClose: 2000 });
      setConfig({ redirectToHome: true });
      return;
    }
    const result = await response.json();
    toast.error(result?.message, { autoClose: 2000 });
  } catch (error) {
    toast.error(error.message, { autoClose: 2000 });
  }
};
