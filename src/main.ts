import * as core from '@actions/core'
import axios, { HttpStatusCode } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import {
  _checkRequiredFields,
  _getAxiosProxySettings,
  _getMantisIssueObject,
  DEFAULT_VALUES,
  REQUIRED_FIELDS
} from './utils'

const run = async (): Promise<void> => {
  const _skipRequired = Boolean(
    core.getInput('skip-required', {
      required: false
    })
  )

  try {
    if (_skipRequired) _checkRequiredFields(REQUIRED_FIELDS)

    const axiosConfigObject: AxiosRequestConfig = {
      method: 'post',
      baseURL: core.getInput('base-url', { required: !_skipRequired }),
      url: core.getInput('url', { required: !_skipRequired }),
      timeout: parseInt(core.getInput('timeout', { required: false })),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          core.getInput('token', { required: false }) !== 'null'
            ? core.getInput('token', { required: false })
            : DEFAULT_VALUES.TOKEN
      },
      validateStatus: () => true,
      ..._getAxiosProxySettings(),
      data: _getMantisIssueObject(_skipRequired)
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
