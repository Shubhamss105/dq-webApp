export const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      restaurantId: params.get('restaurantId') || '',
      tableNo: params.get('tableNo') || ''
    };
  };