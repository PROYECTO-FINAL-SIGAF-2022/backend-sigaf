export const testFunctionGet = async (paramUrl, paramMensaje, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;
    if (!paramHeaders) {
      response = await paramApi.get(paramUrl);
    } else {
      response = await paramApi.get(paramUrl).set(paramHeaders);
    }
    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");
  });
};

export const testFunctionPost = async (paramUrl, paramMensaje, paramSend, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;

    if (!paramHeaders) {
      response = await paramApi.post(paramUrl);
    } else {
      response = await paramApi.post(paramUrl).set(paramHeaders)
        .set("content-type", "application/json")
        .send(paramSend);
    }
    // console.log(response);
    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");
  });
};

export const testFunctionPut = async (paramUrl, paramMensaje, paramSend, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;
    if (!paramHeaders) {
      response = await paramApi.put(paramUrl);
    } else {
      response = await paramApi.put(paramUrl).set(paramHeaders)
        .set("content-type", "application/json")
        .send(paramSend);
    }
    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");
  });
};

export const testFunctionDelete = async (paramUrl, paramMensaje, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;
    if (!paramHeaders) {
      response = await paramApi.delete(paramUrl);
    } else {
      response = await paramApi.delete(paramUrl).set(paramHeaders);
    }
    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");
  });
};
