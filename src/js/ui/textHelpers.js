/**
 * @param {Boolean} status
 */
export default function setLoading(status) {
  if (!status) {
    document.querySelector('#loading').style.display = 'none';
  } else {
    document.querySelector('#loading').style.display = 'block';
  }
}
