import * as core from '@actions/core'
import axios, { HttpStatusCode } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import {
  _checkRequiredFields,
  _getAxiosProxySettings,
  _getMantisIssueObject,
  REQUIRED_FIELDS
} from './utils'

const run = async (): Promise<void> => {
  try {
    _checkRequiredFields(REQUIRED_FIELDS)

    const axiosConfigObject: AxiosRequestConfig = {
      method: 'post',
      baseURL: core.getInput('base-url', { required: true }),
      url: core.getInput('url', { required: true }),
      timeout: parseInt(core.getInput('', { required: false })),
      headers: {
        'Content-Type': 'application/json',
        Authorization: core.getInput('token', { required: true })
      },
      validateStatus: () => true,
      ..._getAxiosProxySettings(),
      data: _getMantisIssueObject()
    }

    const _response = await axios.request(axiosConfigObject)
    if (_response && _response?.status === HttpStatusCode.Created) {
      core.setOutput('issue-id', _response.data.issue.id)
      core.setOutput(
        'issue-url',
        `${
          axiosConfigObject.baseURL +
          (axiosConfigObject.url as string).split('api/rest/issues')[0]
        }view.php?id=${_response.data.issue.id}`
      )
    } else {
      core.setFailed(
        _response?.data
          ? JSON.stringify(_response.data)
          : 'error creating mantis issue'
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

;(async () => await run())()
