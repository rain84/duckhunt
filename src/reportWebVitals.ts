import { ReportHandler } from 'web-vitals'

interface ReportWebVitals {
	(onPerfEntry?: ReportHandler): void
}

const reportWebVitals: ReportWebVitals = (onPerfEntry) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(onPerfEntry)
			getFID(onPerfEntry)
			getFCP(onPerfEntry)
			getLCP(onPerfEntry)
			getTTFB(onPerfEntry)
		})
	}
}

export default reportWebVitals
