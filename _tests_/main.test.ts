// @ts-ignore
import {
  _checkRequiredFields,
  _getAxiosProxySettings,
  _sanitizeInput,
  REQUIRED_FIELDS
} from '../src/utils'

describe('_checkRequiredFields', () => {
  it('check required keys from inputs', () => {
    process.env['INPUT_BASE-URL'] = 'http://localhost.local'
    process.env['INPUT_URL'] = '/mantis'
    process.env['INPUT_TOKEN'] = 'secret'
    process.env['INPUT_SUMMARY'] = 'summary text'
    process.env['INPUT_DESCRIPTION'] = 'description text'
    process.env['INPUT_PROJECT-ID'] = '99'
    process.env['INPUT_CATEGORY-ID'] = '99'
    expect(_checkRequiredFields(REQUIRED_FIELDS)).toBeUndefined()
  })
})

describe('_getAxiosProxySettings', () => {
  it('check empty axios proxyConfig', () => {
    process.env['INPUT_PROXY-TYPE'] = 'null'
    expect(_getAxiosProxySettings()).toStrictEqual({})
  })

  it('check http proxyConfig without auth', () => {
    process.env['INPUT_PROXY-TYPE'] = 'http'
    process.env['INPUT_PROXY-HOST'] = '127.0.0.1'
    process.env['INPUT_PROXY-PORT'] = '8080'
    process.env['INPUT_PROXY-USERNAME'] = 'null'
    expect(_getAxiosProxySettings()).toStrictEqual({
      proxy: {
        host: '127.0.0.1',
        port: 8080,
        protocol: 'http'
      }
    })
  })

  it('check https proxyConfig without auth', () => {
    process.env['INPUT_PROXY-TYPE'] = 'https'
    process.env['INPUT_PROXY-HOST'] = '127.0.0.1'
    process.env['INPUT_PROXY-PORT'] = '8080'
    process.env['INPUT_PROXY-USERNAME'] = 'null'
    expect(_getAxiosProxySettings()).toStrictEqual({
      proxy: {
        host: '127.0.0.1',
        port: 8080,
        protocol: 'https'
      }
    })
  })

  it('check http proxyConfig with auth', () => {
    process.env['INPUT_PROXY-TYPE'] = 'http'
    process.env['INPUT_PROXY-HOST'] = '127.0.0.1'
    process.env['INPUT_PROXY-PORT'] = '8080'
    process.env['INPUT_PROXY-USERNAME'] = 'root'
    process.env['INPUT_PROXY-PASSWORD'] = 'toor'
    expect(_getAxiosProxySettings()).toStrictEqual({
      proxy: {
        auth: {
          username: 'root',
          password: 'toor'
        },
        host: '127.0.0.1',
        port: 8080,
        protocol: 'http'
      }
    })
  })

  it('check https proxyConfig with auth', () => {
    process.env['INPUT_PROXY-TYPE'] = 'https'
    process.env['INPUT_PROXY-HOST'] = '127.0.0.1'
    process.env['INPUT_PROXY-PORT'] = '8080'
    process.env['INPUT_PROXY-USERNAME'] = 'root'
    process.env['INPUT_PROXY-PASSWORD'] = 'toor'
    expect(_getAxiosProxySettings()).toStrictEqual({
      proxy: {
        auth: {
          username: 'root',
          password: 'toor'
        },
        host: '127.0.0.1',
        port: 8080,
        protocol: 'https'
      }
    })
  })
})

describe('_sanitizeInput', () => {
  it('should transform markdown to text and remove script tag', () => {
    expect(_sanitizeInput(`### TITLE 01 <script>alert('test')</script>`)).toBe(
      "TITLE 01 alert('test')"
    )
    expect(_sanitizeInput(`SUPER PROJECT [AAA] \>`)).toBe(
      'SUPER PROJECT [AAA] &gt;'
    )
  })
})
