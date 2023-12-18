/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { tableToIPC, tableFromIPC, Type } from "apache-arrow";
var ArrowTable = /** @class */ (function () {
    function ArrowTable(dataBuffer, indexBuffer, columnsBuffer, styler) {
        var _this = this;
        this.getCell = function (rowIndex, columnIndex) {
            var isBlankCell = rowIndex < _this.headerRows && columnIndex < _this.headerColumns;
            var isIndexCell = rowIndex >= _this.headerRows && columnIndex < _this.headerColumns;
            var isColumnsCell = rowIndex < _this.headerRows && columnIndex >= _this.headerColumns;
            if (isBlankCell) {
                var classNames = ["blank"];
                if (columnIndex > 0) {
                    classNames.push("level" + rowIndex);
                }
                return {
                    type: "blank",
                    classNames: classNames.join(" "),
                    content: ""
                };
            }
            else if (isColumnsCell) {
                var dataColumnIndex = columnIndex - _this.headerColumns;
                var classNames = [
                    "col_heading",
                    "level" + rowIndex,
                    "col" + dataColumnIndex
                ];
                return {
                    type: "columns",
                    classNames: classNames.join(" "),
                    content: _this.getContent(_this.columnsTable, dataColumnIndex, rowIndex)
                };
            }
            else if (isIndexCell) {
                var dataRowIndex = rowIndex - _this.headerRows;
                var classNames = [
                    "row_heading",
                    "level" + columnIndex,
                    "row" + dataRowIndex
                ];
                return {
                    type: "index",
                    id: "T_".concat(_this.uuid, "level").concat(columnIndex, "_row").concat(dataRowIndex),
                    classNames: classNames.join(" "),
                    content: _this.getContent(_this.indexTable, dataRowIndex, columnIndex)
                };
            }
            else {
                var dataRowIndex = rowIndex - _this.headerRows;
                var dataColumnIndex = columnIndex - _this.headerColumns;
                var classNames = [
                    "data",
                    "row" + dataRowIndex,
                    "col" + dataColumnIndex
                ];
                var content = _this.styler
                    ? _this.getContent(_this.styler.displayValuesTable, dataRowIndex, dataColumnIndex)
                    : _this.getContent(_this.dataTable, dataRowIndex, dataColumnIndex);
                return {
                    type: "data",
                    id: "T_".concat(_this.uuid, "row").concat(dataRowIndex, "_col").concat(dataColumnIndex),
                    classNames: classNames.join(" "),
                    content: content
                };
            }
        };
        this.getContent = function (table, rowIndex, columnIndex) {
            var column = table.getChildAt(columnIndex);
            if (column === null) {
                return "";
            }
            var columnTypeId = _this.getColumnTypeId(table, columnIndex);
            switch (columnTypeId) {
                case Type.Timestamp: {
                    return _this.nanosToDate(column.get(rowIndex));
                }
                default: {
                    return column.get(rowIndex);
                }
            }
        };
        this.dataTable = tableFromIPC(dataBuffer);
        this.indexTable = tableFromIPC(indexBuffer);
        this.columnsTable = tableFromIPC(columnsBuffer);
        this.styler = styler
            ? {
                caption: styler.caption,
                displayValuesTable: tableFromIPC(styler.displayValues),
                styles: styler.styles,
                uuid: styler.uuid
            }
            : undefined;
    }
    Object.defineProperty(ArrowTable.prototype, "rows", {
        get: function () {
            return this.indexTable.numRows + this.columnsTable.numCols;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "columns", {
        get: function () {
            return this.indexTable.numCols + this.columnsTable.numRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "headerRows", {
        get: function () {
            return this.rows - this.dataRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "headerColumns", {
        get: function () {
            return this.columns - this.dataColumns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "dataRows", {
        get: function () {
            return this.dataTable.numRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "dataColumns", {
        get: function () {
            return this.dataTable.numCols;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "uuid", {
        get: function () {
            return this.styler && this.styler.uuid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "caption", {
        get: function () {
            return this.styler && this.styler.caption;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "styles", {
        get: function () {
            return this.styler && this.styler.styles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "table", {
        get: function () {
            return this.dataTable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "index", {
        get: function () {
            return this.indexTable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrowTable.prototype, "columnTable", {
        get: function () {
            return this.columnsTable;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Serialize arrow table.
     */
    ArrowTable.prototype.serialize = function () {
        return {
            data: tableToIPC(this.dataTable),
            index: tableToIPC(this.indexTable),
            columns: tableToIPC(this.columnsTable)
        };
    };
    /**
     * Returns apache-arrow specific typeId of column.
     */
    ArrowTable.prototype.getColumnTypeId = function (table, columnIndex) {
        return table.schema.fields[columnIndex].type.typeId;
    };
    ArrowTable.prototype.nanosToDate = function (nanos) {
        return new Date(nanos / 1e6);
    };
    return ArrowTable;
}());
export { ArrowTable };
