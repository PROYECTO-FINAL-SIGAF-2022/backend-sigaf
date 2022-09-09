export const testFunctionGet = async (paramUrl, paramMensaje, paramStatus, paramApi, paramHeaders) => {
  await test(paramMensaje, async () => {
    if (!paramHeaders) {
      const response = await paramApi.get(paramUrl);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    } else {
      const response = await paramApi.get(paramUrl).set(paramHeaders);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    }
  });
};

export const testFunctionPost = async (paramUrl, paramMensaje, paramSend, paramStatus, paramApi, paramHeaders) => {
  await test(paramMensaje, async () => {
    if (!paramHeaders) {
      const response = await paramApi.post(paramUrl);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    } else {
      const response = await paramApi.post(paramUrl).set(paramHeaders)
        .set("content-type", "application/json")
        .send(paramSend);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    }
  });
};

export const testFunctionPut = async (paramUrl, paramMensaje, paramSend, paramStatus, paramApi, paramHeaders) => {
  await test(paramMensaje, async () => {
    if (!paramHeaders) {
      const response = await paramApi.put(paramUrl);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    } else {
      const response = await paramApi.put(paramUrl).set(paramHeaders)
        .set("content-type", "application/json")
        .send(paramSend);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    }
  });
};

export const testFunctionDelete = async (paramUrl, paramMensaje, paramStatus, paramApi, paramHeaders) => {
  await test(paramMensaje, async () => {
    if (!paramHeaders) {
      const response = await paramApi.delete(paramUrl);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    } else {
      const response = await paramApi.delete(paramUrl).set(paramHeaders);
      expect(response.statusCode).toEqual(paramStatus);
      expect(response.type).toEqual("application/json");
    }
  });
};
